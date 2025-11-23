<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');

$routes->group('api', function($routes) {
    $routes->get('cart', 'CartController::getCart');
    $routes->post('cart/add', 'CartController::addCart');
    $routes->put('cart/update/(:num)', 'CartController::updateCart/$1');
    $routes->delete('cart/remove/(:num)', 'CartController::removeCart/$1');
});
