# Contact Import Template

## Files
- `contact-import-template.csv` — Template with example row
- `john-contact-import.csv` — Empty template for John's extraction

## Fields

| Field | Required | Description |
|-------|----------|-------------|
| `name` | ✅ | Full name (e.g., "John Smith") |
| `email` | ✅ | Email address |
| `company` | | Company/organization name |
| `role` | | Job title (e.g., "CEO", "Narrative Designer") |
| `phone` | | Phone number |
| `linkedin` | | LinkedIn URL or /in/username |
| `contact_type` | | One of: `investor`, `partner`, `customer`, `press`, `vendor`, `other` |
| `source` | | Where contact came from (e.g., `gmail-import`, `conference`, `referral`) |
| `notes` | | Any additional context |

## Rules
- **Only include verifiable information** — no guesses
- If a field is unknown, leave it empty
- Use double quotes around fields with commas
- UTF-8 encoding

## Example
```csv
name,email,company,role,phone,linkedin,contact_type,source,notes
"Jane Doe","jane@studioname.com","Studio Name","Lead Designer","","","partner","gmail-import","Discussed Architect integration"
```

## Import
After filling, run the import script (TBD) or add manually via CRM UI.
