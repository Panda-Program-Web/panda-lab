# Connpass Clone Sample

This is a minimal example of an event management API built with Slim and php-di.
It demonstrates usage of Entities and Value Objects without a framework like Laravel.

## Directory Structure

- `src/Domain` - Entities and Value Objects
- `src/Dto` - Data Transfer Objects
- `src/Service` - Application services
- `public/index.php` - Slim entry point

## Requirements

- PHP 8.4 or later
- Composer with `slim/slim` and `php-di/php-di` installed

Run the API with `php -S localhost:8080 -t public` after installing dependencies.
