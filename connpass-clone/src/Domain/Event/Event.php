<?php
namespace ConnpassClone\Domain\Event;

final readonly class Event
{
    public function __construct(
        public EventId $id,
        public EventTitle $title,
        public EventDate $date,
        public int $capacity
    ) {
        if ($capacity <= 0) {
            throw new \InvalidArgumentException('Capacity must be positive');
        }
    }
}
