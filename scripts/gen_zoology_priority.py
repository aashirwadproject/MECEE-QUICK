#!/usr/bin/env python3
import json

def make_ts_file(filepath, varname, questions):
    with open(filepath, "w") as f:
        f.write("import { Question } from '../../types';\n\n")
        f.write(f"export const {varname}: Question[] = [\n")
        for q in questions:
            q_json = json.dumps(q, indent=2)
            f.write(f"  {q_json},\n")
        f.write("];\n")

print("Writing Zoology Priority generators...")
