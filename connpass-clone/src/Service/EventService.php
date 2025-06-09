<?php
namespace ConnpassClone\Service;

use ConnpassClone\Domain\Event\Event;
use ConnpassClone\Domain\Event\EventId;
use ConnpassClone\Domain\Event\EventTitle;
use ConnpassClone\Domain\Event\EventDate;
use ConnpassClone\Dto\CreateEventDto;

final class EventService
{
    /** @var Event[] */
    private array $events = [];
    private int $nextId = 1;

    public function create(CreateEventDto $dto): Event
    {
        $event = new Event(
            new EventId($this->nextId++),
            new EventTitle($dto->title),
            EventDate::fromString($dto->date),
            $dto->capacity,
        );
        $this->events[$event->id->value] = $event;
        return $event;
    }

    public function list(): array
    {
        return array_values($this->events);
    }
}
