<?php

namespace App\Controller;

use App\Entity\Categorie;
use App\Repository\CategorieRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Serializer\SerializerInterface;

#[Route('/api/categories')]
class CategorieController extends AbstractController
{
    #[Route('', methods: ['GET'])]
    public function getCategories(CategorieRepository $categorieRepository, SerializerInterface $serializer): Response
    {
        $categories = $categorieRepository->findAll();
        $data = $serializer->serialize($categories, 'json', ['groups' => 'categorie:read']);
        return new Response($data, 200, ['Content-Type' => 'application/ld+json']);
    }

    #[Route('', methods: ['POST'])]
    public function createCategorie(Request $request, EntityManagerInterface $em, SerializerInterface $serializer): Response
    {
        $categorie = $serializer->deserialize($request->getContent(), Categorie::class, 'json');
        $em->persist($categorie);
        $em->flush();
        return new Response('', 201);
    }

    #[Route('/{id}', methods: ['PUT'])]
    public function updateCategorie(int $id, Request $request, CategorieRepository $categorieRepository, EntityManagerInterface $em, SerializerInterface $serializer): Response
    {
        $categorie = $categorieRepository->find($id);
        if (!$categorie) {
            return new Response('Catégorie non trouvée', 404);
        }
        $serializer->deserialize($request->getContent(), Categorie::class, 'json', ['object_to_populate' => $categorie]);
        $em->flush();
        return new Response('', 200);
    }

    #[Route('/{id}', methods: ['DELETE'])]
    public function deleteCategorie(int $id, CategorieRepository $categorieRepository, EntityManagerInterface $em): Response
    {
        $categorie = $categorieRepository->find($id);
        if (!$categorie) {
            return new Response('Catégorie non trouvée', 404);
        }
        $em->remove($categorie);
        $em->flush();
        return new Response('', 204);
    }
}
