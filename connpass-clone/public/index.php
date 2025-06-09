<?php
require __DIR__ . '/../vendor/autoload.php';

use DI\Container;
use Slim\Factory\AppFactory;
use ConnpassClone\Dto\CreateEventDto;
use ConnpassClone\Service\EventService;
use ConnpassClone\Domain\Event\Event;

$container = new Container();
AppFactory::setContainer($container);
$app = AppFactory::create();

$container->set(EventService::class, new EventService());

$app->post('/events', function ($request, $response) {
    $params = (array)$request->getParsedBody();
    $dto = new CreateEventDto(
        $params['title'] ?? '',
        $params['date'] ?? '',
        (int)($params['capacity'] ?? 0)
    );

    /** @var EventService $service */
    $service = $this->get(EventService::class);
    $event = $service->create($dto);

    $response->getBody()->write(json_encode([
        'id' => $event->id->value,
        'title' => $event->title->value,
        'date' => $event->date->value->format('Y-m-d H:i:s'),
        'capacity' => $event->capacity
    ]));
    return $response->withHeader('Content-Type', 'application/json');
});

$app->get('/events', function ($request, $response) {
    /** @var EventService $service */
    $service = $this->get(EventService::class);
    $events = array_map(static fn(Event $event) => [
        'id' => $event->id->value,
        'title' => $event->title->value,
        'date' => $event->date->value->format('Y-m-d H:i:s'),
        'capacity' => $event->capacity
    ], $service->list());

    $response->getBody()->write(json_encode($events));
    return $response->withHeader('Content-Type', 'application/json');
});

$app->run();
