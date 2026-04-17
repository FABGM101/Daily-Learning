from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

missions_db = [
    {"id": 1, "texto": "Derrote os goblins na caverna ao norte de Voidsky"},
    {"id": 2, "texto": "Ajude o rei de Kylmane com os protestos em prol dos não-humanos"},
    {"id": 3, "texto": "Entregue a carta da guilda dos mercadores nas províncias de Ilbath"},
    {"id": 4, "texto": "Faça essas malditas crianças pararem de jogar pedras nas corujas (Mais 50GL por criança)"}
]

@app.get("/missions")
def list_missions():
    return missions_db