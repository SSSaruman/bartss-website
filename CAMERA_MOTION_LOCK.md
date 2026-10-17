# CAMERA MOTION LOCK — APPROVED
Date: 2026-10-13
Status: LOCKED BY USER
Reference implementation: monitor-reveal-lab.html
Reference commit: 11f3132a92c7d72947fe4b4d7dac4704115a7725

## Immutable sequence
1. Gökyüzü
2. Çimenli zemin
3. Kamera geriye çekilmeye başlar
4. Ekranın kenarları kadraja girer
5. Monitörün tamamı görünür
6. Masa ve oda açığa çıkar
7. Sandalyedeki karakter görünür

## Constraints
- Scroll-driven continuous backward camera move (no cut, jump, screen overlay fade or replacement).
- Keep the same world visually inside the monitor throughout the reveal.
- Preserve ordering, camera direction, and transition logic from the reference implementation.
- Do not change the camera motion, timings or framing without explicit user approval.
- Future work may modify approved scene artwork only if explicitly requested; camera motion remains locked.
- This is a user-approved motion specification, NOT a claim of browser E2E/PASS.
