<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->options('(:any)', function() {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
    exit(0);
});

$routes->get('/', 'Home::index');

$routes->group('api', function($routes) {
    $routes->get('cart', 'CartController::getCart');
    $routes->post('cart/add', 'CartController::addCart');
    $routes->put('cart/update/(:num)', 'CartController::updateCart/$1');
    $routes->delete('cart/remove/(:num)', 'CartController::removeCart/$1');
});
