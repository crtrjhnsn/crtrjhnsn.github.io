#!/usr/bin/env python3
"""
add-artifact.py — Interactive CLI to add a new artifact to the gallery.

Usage:
    python3 add-artifact.py
    python3 add-artifact.py --file path/to/my-tool.html
"""

import json, os, re, shutil, sys, datetime
from pathlib import Path

GALLERY_DIR   = Path(__file__).parent
CONTENT_DIR   = GALLERY_DIR / "content"
ARTIFACTS_JSON = CONTENT_DIR / "artifacts.json"

TYPE_FOLDERS = {
    "claude": "claude",
    "doc":    "docs",
    "image":  "images",
    "code":   "code",
}
TYPE_LABELS = {
    "claude": "Claude artifact (HTML)",
    "doc":    "Document (Markdown)",
    "image":  "Image",
    "code":   "Code snippet",
}

def slugify(text: str) -> str:
    text = text.lower().strip()
    text = re.sub(r"[^\w\s-]", "", text)
    text = re.sub(r"[\s_-]+", "-", text)
    text = re.sub(r"^-+|-+$", "", text)
    return text

def prompt(question: str, default: str = "") -> str:
    suffix = f" [{default}]" if default else ""
    val = input(f"{question}{suffix}: ").strip()
    return val if val else default

def choose(question: str, options: dict) -> str:
    print(f"\n{question}")
    keys = list(options.keys())
    for i, k in enumerate(keys, 1):
        print(f"  {i}. {options[k]}  ({k})")
    while True:
        raw = input("Choose [1]: ").strip()
        if not raw:
            return keys[0]
        if raw.isdigit() and 1 <= int(raw) <= len(keys):
            return keys[int(raw) - 1]
        print("  Invalid choice, try again.")

def load_artifacts() -> list:
    if ARTIFACTS_JSON.exists():
        with open(ARTIFACTS_JSON) as f:
            return json.load(f)
    return []

def save_artifacts(artifacts: list):
    with open(ARTIFACTS_JSON, "w") as f:
        json.dump(artifacts, f, indent=2)
    print(f"  Saved {ARTIFACTS_JSON}")

def id_exists(artifacts: list, artifact_id: str) -> bool:
    return any(a["id"] == artifact_id for a in artifacts)

def main():
    print("\n=== Artifact Gallery — Add Artifact ===\n")

    # Source file (optional via --file flag)
    source_file = None
    if "--file" in sys.argv:
        idx = sys.argv.index("--file")
        if idx + 1 < len(sys.argv):
            source_file = Path(sys.argv[idx + 1])
            if not source_file.exists():
                print(f"Error: file not found: {source_file}")
                sys.exit(1)

    # Type
    artifact_type = choose("Artifact type:", TYPE_LABELS)

    # Title
    title = ""
    while not title:
        title = prompt("Title").strip()
        if not title:
            print("  Title is required.")

    # Suggested id from title
    suggested_id = slugify(title)
    artifacts = load_artifacts()
    base_id = suggested_id
    counter = 1
    while id_exists(artifacts, suggested_id):
        suggested_id = f"{base_id}-{counter}"
        counter += 1

    artifact_id = prompt("ID (URL-safe, unique)", suggested_id)
    artifact_id = slugify(artifact_id) or suggested_id
    if id_exists(artifacts, artifact_id):
        print(f"  Warning: id '{artifact_id}' already exists. It will be overwritten.")

    description = prompt("Description (optional)")
    tags_raw    = prompt("Tags (comma-separated, optional)")
    tags = [t.strip() for t in tags_raw.split(",") if t.strip()] if tags_raw else []
    date = prompt("Date (YYYY-MM-DD)", datetime.date.today().isoformat())

    # Language (code only)
    language = None
    if artifact_type == "code":
        language = prompt("Language for syntax highlighting (e.g. typescript, python)", "")

    # Destination folder
    dest_folder = CONTENT_DIR / TYPE_FOLDERS[artifact_type]
    dest_folder.mkdir(parents=True, exist_ok=True)

    # Determine file path
    if source_file:
        dest_file = dest_folder / source_file.name
        if source_file.resolve() != dest_file.resolve():
            shutil.copy2(source_file, dest_file)
            print(f"  Copied {source_file} → {dest_file}")
        file_path = f"content/{TYPE_FOLDERS[artifact_type]}/{source_file.name}"
    else:
        existing = prompt(
            f"Relative file path (e.g. content/{TYPE_FOLDERS[artifact_type]}/my-file.html)",
            f"content/{TYPE_FOLDERS[artifact_type]}/{artifact_id}.html"
        )
        file_path = existing

    # Build entry
    entry = {
        "id":          artifact_id,
        "title":       title,
        "type":        artifact_type,
        "file":        file_path,
        "tags":        tags,
        "date":        date,
    }
    if description:
        entry["description"] = description
    if language:
        entry["language"] = language

    # Insert or replace
    artifacts = [a for a in artifacts if a["id"] != artifact_id]
    artifacts.insert(0, entry)
    save_artifacts(artifacts)

    print(f"""
Done! Artifact added:
  ID:    {artifact_id}
  Title: {title}
  Type:  {artifact_type}
  File:  {file_path}

Start the gallery:
  python3 -m http.server 8000
  open http://localhost:8000
""")

if __name__ == "__main__":
    main()
