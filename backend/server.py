from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


class Inventor(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    nev: str
    szul: Optional[int] = None
    meghal: Optional[int] = None


class InventorCreate(BaseModel):
    nev: str
    szul: Optional[int] = None
    meghal: Optional[int] = None


class InventorUpdate(BaseModel):
    nev: Optional[str] = None
    szul: Optional[int] = None
    meghal: Optional[int] = None


SEED_INVENTORS = [
    {"nev": "Jedlik Ányos István", "szul": 1800, "meghal": 1895},
    {"nev": "Bláthy Ottó Titusz", "szul": 1860, "meghal": 1939},
    {"nev": "Zipernowsky Károly", "szul": 1853, "meghal": 1942},
    {"nev": "Déri Miksa", "szul": 1854, "meghal": 1938},
    {"nev": "Bánki Donát", "szul": 1859, "meghal": 1922},
    {"nev": "Csonka János", "szul": 1852, "meghal": 1939},
    {"nev": "Puskás Tivadar", "szul": 1844, "meghal": 1893},
    {"nev": "Kandó Kálmán", "szul": 1869, "meghal": 1931},
    {"nev": "Ganz Ábrahám", "szul": 1814, "meghal": 1867},
    {"nev": "Mechwart András", "szul": 1834, "meghal": 1907},
    {"nev": "Petzval József", "szul": 1807, "meghal": 1891},
    {"nev": "Segner János András", "szul": 1704, "meghal": 1777},
    {"nev": "Mihály Dénes", "szul": 1894, "meghal": 1953},
    {"nev": "Tihanyi Kálmán", "szul": 1897, "meghal": 1947},
    {"nev": "Bíró László", "szul": 1899, "meghal": 1985},
    {"nev": "Gábor Dénes", "szul": 1900, "meghal": 1979},
    {"nev": "Bay Zoltán", "szul": 1900, "meghal": 1992},
    {"nev": "Teller Ede", "szul": 1908, "meghal": 2003},
    {"nev": "Szilárd Leó", "szul": 1898, "meghal": 1964},
    {"nev": "Wigner Jenő", "szul": 1902, "meghal": 1995},
    {"nev": "Neumann János", "szul": 1903, "meghal": 1957},
    {"nev": "Békésy György", "szul": 1899, "meghal": 1972},
    {"nev": "Szent-Györgyi Albert", "szul": 1893, "meghal": 1986},
    {"nev": "Kármán Tódor", "szul": 1881, "meghal": 1963},
    {"nev": "Goldmark Péter Károly", "szul": 1906, "meghal": 1977},
    {"nev": "Kemény János György", "szul": 1926, "meghal": 1992},
    {"nev": "Bródy Imre", "szul": 1891, "meghal": 1944},
    {"nev": "Just Sándor", "szul": 1874, "meghal": 1937},
    {"nev": "Frommer Rudolf", "szul": 1868, "meghal": 1936},
    {"nev": "Hanaman Ferenc", "szul": 1878, "meghal": 1941},
]


@app.on_event("startup")
async def seed_db():
    count = await db.inventors.count_documents({})
    if count == 0:
        docs = [{**Inventor(**d).model_dump()} for d in SEED_INVENTORS]
        await db.inventors.insert_many(docs)
        logger.info(f"Seeded {len(docs)} inventors")


@api_router.get("/")
async def root():
    return {"message": "Magyar Feltalálók API"}


@api_router.get("/inventors", response_model=List[Inventor])
async def list_inventors():
    items = await db.inventors.find({}, {"_id": 0}).to_list(1000)
    return items


@api_router.get("/inventors/{inv_id}", response_model=Inventor)
async def get_inventor(inv_id: str):
    item = await db.inventors.find_one({"id": inv_id}, {"_id": 0})
    if not item:
        raise HTTPException(status_code=404, detail="Feltaláló nem található")
    return item


@api_router.post("/inventors", response_model=Inventor)
async def create_inventor(payload: InventorCreate):
    obj = Inventor(**payload.model_dump())
    doc = obj.model_dump()
    await db.inventors.insert_one(doc)
    return obj


@api_router.put("/inventors/{inv_id}", response_model=Inventor)
async def update_inventor(inv_id: str, payload: InventorUpdate):
    update_data = {k: v for k, v in payload.model_dump().items() if v is not None}
    if not update_data:
        raise HTTPException(status_code=400, detail="Nincs frissítendő mező")
    result = await db.inventors.update_one({"id": inv_id}, {"$set": update_data})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Feltaláló nem található")
    item = await db.inventors.find_one({"id": inv_id}, {"_id": 0})
    return item


@api_router.delete("/inventors/{inv_id}")
async def delete_inventor(inv_id: str):
    result = await db.inventors.delete_one({"id": inv_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Feltaláló nem található")
    return {"ok": True, "deleted": inv_id}


@api_router.post("/inventors/reset")
async def reset_inventors():
    await db.inventors.delete_many({})
    docs = [{**Inventor(**d).model_dump()} for d in SEED_INVENTORS]
    await db.inventors.insert_many(docs)
    return {"ok": True, "count": len(docs)}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
