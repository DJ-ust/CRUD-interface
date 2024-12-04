<?php

namespace App\Controller;

use App\Entity\Produit;
use App\Repository\ProduitRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Serializer\SerializerInterface;

#[Route('/api/produits')]
class ProduitController extends AbstractController
{
    #[Route('', methods: ['GET'])]
    public function getProduits(ProduitRepository $produitRepository, SerializerInterface $serializer): Response
    {
        $produits = $produitRepository->findAll();
        $data = $serializer->serialize($produits, 'json', ['groups' => 'produit:read']);
        return new Response($data, 200, ['Content-Type' => 'application/ld+json']);
    }

    #[Route('', methods: ['POST'])]
    public function createProduit(Request $request, EntityManagerInterface $em, SerializerInterface $serializer): Response
    {
        $produit = $serializer->deserialize($request->getContent(), Produit::class, 'json');
        $em->persist($produit);
        $em->flush();
        return new Response('', 201);
    }

    #[Route('/{id}', methods: ['PUT'])]
    public function updateProduit(int $id, Request $request, ProduitRepository $produitRepository, EntityManagerInterface $em, SerializerInterface $serializer): Response
    {
        $produit = $produitRepository->find($id);
        if (!$produit) {
            return new Response('Produit non trouvé', 404);
        }
        $serializer->deserialize($request->getContent(), Produit::class, 'json', ['object_to_populate' => $produit]);
        $em->flush();
        return new Response('', 200);
    }

    #[Route('/{id}', methods: ['DELETE'])]
    public function deleteProduit(int $id, ProduitRepository $produitRepository, EntityManagerInterface $em): Response
    {
        $produit = $produitRepository->find($id);
        if (!$produit) {
            return new Response('Produit non trouvé', 404);
        }
        $em->remove($produit);
        $em->flush();
        return new Response('', 204);
    }
}
