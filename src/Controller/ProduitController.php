<?php

namespace App\Controller;

use App\Entity\Produit;
use App\Repository\ProduitRepository;
use App\Repository\CategorieRepository;
use Doctrine\ORM\EntityManagerInterface;
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
        $produits = $produitRepository->findAll();
        return $this->json($produits);
    }

    // Route POST pour créer un produit
    /**
     * @Route("/api/produits", methods={"POST"})
     */
    public function createProduit(
        Request $request, 
        CategorieRepository $categorieRepository, 
        EntityManagerInterface $entityManager
    ): Response {
        $data = json_decode($request->getContent(), true);

        $produit = new Produit();
        $produit->setNom($data['nom']);
        $produit->setDescription($data['description']);
        $produit->setPrix($data['prix']);

        $categorie = $categorieRepository->find($data['categorie_id']);
        $produit->setCategorie($categorie);

        $entityManager->persist($produit);
        $entityManager->flush();

        return $this->json($produit, Response::HTTP_CREATED);
    }

    // Route PUT pour mettre à jour un produit existant
    /**
     * @Route("/api/produits/{id}", methods={"PUT"})
     */
    public function updateProduit(
        Request $request, 
        Produit $produit, 
        EntityManagerInterface $entityManager
    ): Response {
        $data = json_decode($request->getContent(), true);
        $produit->setNom($data['nom']);
        $produit->setDescription($data['description']);
        $produit->setPrix($data['prix']);

        $entityManager->flush();

        return $this->json($produit);
    }

    // Route DELETE pour supprimer un produit
    /**
     * @Route("/api/produits/{id}", methods={"DELETE"})
     */
    public function deleteProduit(Produit $produit, EntityManagerInterface $entityManager): Response
    {
        $entityManager->remove($produit);
        $entityManager->flush();

        return $this->json(['status' => 'Produit supprimé']);
    }
}
