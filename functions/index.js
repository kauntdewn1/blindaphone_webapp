const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();
const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

// POST - Cadastrar aplicador
app.post("/aplicador", async (req, res) => {
  try {
    const data = req.body;
    const docRef = await db.collection("aplicadores").add({
      ...data,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    res.status(200).send({ 
      msg: "Aplicador cadastrado com sucesso",
      id: docRef.id 
    });
  } catch (error) {
    console.error("Erro ao cadastrar aplicador:", error);
    res.status(500).send({ error: "Erro interno do servidor" });
  }
});

// GET - Buscar por cidade
app.get("/cidade/:nome", async (req, res) => {
  try {
    const cidade = req.params.nome;
    const snapshot = await db
      .collection("aplicadores")
      .where("cidade", "==", cidade)
      .get();
    
    const result = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    res.status(200).json(result);
  } catch (error) {
    console.error("Erro ao buscar por cidade:", error);
    res.status(500).send({ error: "Erro interno do servidor" });
  }
});

// GET - Listar todos os aplicadores
app.get("/aplicadores", async (req, res) => {
  try {
    const snapshot = await db.collection("aplicadores").get();
    const result = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    res.status(200).json(result);
  } catch (error) {
    console.error("Erro ao listar aplicadores:", error);
    res.status(500).send({ error: "Erro interno do servidor" });
  }
});

// GET - Buscar aplicador por ID
app.get("/aplicador/:id", async (req, res) => {
  try {
    const doc = await db.collection("aplicadores").doc(req.params.id).get();
    
    if (!doc.exists) {
      return res.status(404).send({ error: "Aplicador não encontrado" });
    }
    
    res.status(200).json({
      id: doc.id,
      ...doc.data()
    });
  } catch (error) {
    console.error("Erro ao buscar aplicador:", error);
    res.status(500).send({ error: "Erro interno do servidor" });
  }
});

// PUT - Atualizar aplicador
app.put("/aplicador/:id", async (req, res) => {
  try {
    const data = req.body;
    await db.collection("aplicadores").doc(req.params.id).update({
      ...data,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    res.status(200).send({ msg: "Aplicador atualizado com sucesso" });
  } catch (error) {
    console.error("Erro ao atualizar aplicador:", error);
    res.status(500).send({ error: "Erro interno do servidor" });
  }
});

// DELETE - Deletar aplicador
app.delete("/aplicador/:id", async (req, res) => {
  try {
    await db.collection("aplicadores").doc(req.params.id).delete();
    res.status(200).send({ msg: "Aplicador deletado com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar aplicador:", error);
    res.status(500).send({ error: "Erro interno do servidor" });
  }
});

exports.api = functions.https.onRequest(app); 