<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\RESTful\ResourceController;

class CartController extends ResourceController
{
    protected $format = 'json';

    /**
     * Static cart response used for all endpoints
     */
    private function getStaticCartData(): array
    {
        return [
            "items" => [
                [
                    "id" => 1,
                    "title" => "Sample Product",
                    "price" => 19.99,
                    "quantity" => 2,
                    "image" => "https://dummyimage.com/300x300/cccccc/000000&text=Sample"
                ],
                [
                    "id" => 2,
                    "title" => "Another Product",
                    "price" => 9.99,
                    "quantity" => 1,
                    "image" => "https://dummyimage.com/300x300/cccccc/000000&text=Another"
                ]
            ],
            "subtotal" => 49.97,
            "tax" => 3.50,
            "total" => 53.47
        ];
    }

    /**
     * GET /api/cart
     */
    public function getCart(): ResponseInterface
    {
        return $this->respond($this->getStaticCartData());
    }

    /**
     * POST /api/cart/add
     */
    public function addCart(): ResponseInterface
    {
        // Normally you would validate and update DB, but we return static data.
        return $this->respondCreated($this->getStaticCartData());
    }

    /**
     * PUT /api/cart/update/{id}
     */
    public function updateCart(?int $id = null): ResponseInterface
    {
        // Pretend we updated quantity for item $id
        return $this->respond($this->getStaticCartData());
    }

    /**
     * DELETE /api/cart/remove/{id}
     */
    public function removeCart(?int $id = null): ResponseInterface
    {
        // Pretend we removed item $id
        return $this->respondDeleted($this->getStaticCartData());
    }
}