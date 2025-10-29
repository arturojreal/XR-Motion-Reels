
# Create comprehensive project structure and code for XR Motion Community Reel
# I'll organize this into a complete Next.js 15 application with all required features

project_structure = """
xr-motion-reel/
├── README.md
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
├── .eslintrc.json
├── .prettierrc
├── public/
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── submit/
│   │   │   └── page.tsx
│   │   ├── api/
│   │   │   └── submissions/
│   │   │       └── route.ts
│   │   └── globals.css
│   ├── components/
│   │   ├── ProjectorView.tsx
│   │   ├── AdminPanel.tsx
│   │   ├── SubmissionForm.tsx
│   │   ├── ReelPlayer.tsx
│   │   └── QRCodeDisplay.tsx
│   ├── lib/
│   │   ├── db.ts
│   │   └── utils.ts
│   ├── types/
│   │   └── index.ts
│   ├── hooks/
│   │   ├── useKeyPress.ts
│   │   ├── useTapDetection.ts
│   │   └── useSubmissions.ts
│   └── store/
│       └── submissionStore.ts
└── data/
    └── submissions.json
"""

print("XR MOTION COMMUNITY REEL - COMPLETE PROJECT STRUCTURE")
print("=" * 70)
print(project_structure)
print("\n" + "=" * 70)
print("\nGenerating all project files...\n")
