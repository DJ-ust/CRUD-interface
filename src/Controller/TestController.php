<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class TestController
{
    #[Route('/test', name: 'app_test')]
    public function test(): Response
    {
        return new Response('<h1>Ça fonctionne !</h1>');
    }
}
