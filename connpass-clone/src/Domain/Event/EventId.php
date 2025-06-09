<?php
namespace ConnpassClone\Domain\Event;

final readonly class EventId
{
    public function __construct(public int $value)
    {
        if ($value <= 0) {
            throw new \InvalidArgumentException('EventId must be positive integer');
        }
    }

    public function value(): int
    {
        return $this->value;
    }
}
