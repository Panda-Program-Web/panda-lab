<?php
namespace ConnpassClone\Domain\Event;

use DateTimeImmutable;

final readonly class EventDate
{
    public function __construct(public DateTimeImmutable $value)
    {
    }

    public static function fromString(string $datetime): self
    {
        return new self(new DateTimeImmutable($datetime));
    }

    public function value(): DateTimeImmutable
    {
        return $this->value;
    }
}
