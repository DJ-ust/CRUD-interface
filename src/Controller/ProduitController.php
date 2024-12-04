// src/Controller/ProduitController.php

namespace App\Controller;

use App\Entity\Produit;
use App\Repository\ProduitRepository;
use App\Repository\CategorieRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class ProduitController extends AbstractController
{
    // Route GET pour récupérer tous les produits
    /**
     * @Route("/api/produits", methods={"GET"})
     */
    public function getProduits(ProduitRepository $produitRepository): Response
    {
        // On récupère tous les produits de la base de données
        $produits = $produitRepository->findAll();
        // On retourne les produits sous forme de JSON
        return $this->json($produits);
    }

    // Route POST pour créer un produit
    /**
     * @Route("/api/produits", methods={"POST"})
     */
    public function createProduit(Request $request, CategorieRepository $categorieRepository): Response
    {
        // On récupère les données envoyées par l'utilisateur (en JSON)
        $data = json_decode($request->getContent(), true);

        // On crée un nouvel objet Produit
        $produit = new Produit();
        $produit->setNom($data['nom']);
        $produit->setDescription($data['description']);
        $produit->setPrix($data['prix']);
        
        // On récupère la catégorie à partir de l'ID de catégorie envoyé dans la requête
        $categorie = $categorieRepository->find($data['categorie_id']);
        $produit->setCategorie($categorie);

        // On persiste le produit dans la base de données
        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($produit);
        $entityManager->flush();

        // On renvoie le produit créé
        return $this->json($produit, Response::HTTP_CREATED);
    }

    // Route PUT pour mettre à jour un produit existant
    /**
     * @Route("/api/produits/{id}", methods={"PUT"})
     */
    public function updateProduit(Request $request, Produit $produit): Response
    {
        // On récupère les données envoyées par l'utilisateur
        $data = json_decode($request->getContent(), true);
        $produit->setNom($data['nom']);
        $produit->setDescription($data['description']);
        $produit->setPrix($data['prix']);

        // On met à jour le produit dans la base de données
        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->flush();

        // On renvoie le produit mis à jour
        return $this->json($produit);
    }

    // Route DELETE pour supprimer un produit
    /**
     * @Route("/api/produits/{id}", methods={"DELETE"})
     */
    public function deleteProduit(Produit $produit): Response
    {
        // On supprime le produit de la base de données
        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->remove($produit);
        $entityManager->flush();

        // On renvoie une réponse indiquant que le produit a été supprimé
        return $this->json(['status' => 'Produit supprimé']);
    }
}
