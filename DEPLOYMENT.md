# Portfolio Assistant Deployment

The visitor-facing assistant is split deliberately between the static portfolio frontend and the Render backend.

| Deployment | Required variables | Purpose |
|---|---|---|
| **Render** | `NVIDIA_NIM_API_KEY` or the existing `NVIDIA_API_KEY`; `GROQ_API_KEY` | Keeps the model-provider credentials server-side. NVIDIA NIM is attempted first and Groq is used only when it is unavailable. |
| **Vercel** | `VITE_ASSISTANT_API_URL` *(optional)* | A public, non-secret URL for the assistant backend. It defaults to `https://suyash-portfolio-backend.onrender.com`, so it only needs setting when the Render URL changes. |

No NVIDIA NIM or Groq key is read by, embedded in, or required by the Vercel frontend.
