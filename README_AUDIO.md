# Site audio

The file `assets/audio/velvet-index.mp3` is loaded by `assets/js/main.js`.

Behaviour:
• the site attempts to start music automatically
• the visitor can stop or restart it using the floating audio control
• the playback position is saved in localStorage
• when the visitor changes page, the next page resumes from the saved position instead of starting from zero

Important browser note:
Modern browsers may block audible autoplay before the first user interaction. In that case the button shows `Enable audio` or `Attiva audio`, and the track starts after the visitor clicks.
