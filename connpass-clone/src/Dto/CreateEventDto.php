<?php
namespace ConnpassClone\Dto;

final readonly class CreateEventDto
{
    public function __construct(
        public string $title,
        public string $date,
        public int $capacity
    ) {
    }
}
