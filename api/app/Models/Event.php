<?php

namespace App\Models;

use Database\Factories\EventFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable(['title', 'description', 'location', 'image_url', 'wiki_url', 'starts_at', 'capacity'])]
class Event extends Model
{
    /** @use HasFactory<EventFactory> */
    use HasFactory;

    public function rsvps(): HasMany
    {
        return $this->hasMany(Rsvp::class);
    }

    public function isFull(): bool
    {
        return $this->rsvps()->where('status', 'attending')->count() >= $this->capacity;
    }

    protected function casts(): array
    {
        return [
            'starts_at' => 'datetime',
            'capacity' => 'integer',
        ];
    }
}
