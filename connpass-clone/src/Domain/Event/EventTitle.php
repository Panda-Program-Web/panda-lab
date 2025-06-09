<?php
namespace ConnpassClone\Domain\Event;

final readonly class EventTitle
{
    public function __construct(public string $value)
    {
        $value = trim($value);
        if ($value === '') {
            throw new \InvalidArgumentException('EventTitle cannot be empty');
        }
        $this->value = $value;
    }

    public function value(): string
    {
        return $this->value;
    }
}
