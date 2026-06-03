<?php

namespace Database\Seeders;

use App\Models\Event;
use App\Models\Rsvp;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class EventSeeder extends Seeder
{
    private const LOCATIONS = [
        'trinity' => 'Trinity General School',
        'gehenna' => 'Gehenna Academy',
        'millennium' => 'Millennium Science School',
        'abydos' => 'Abydos High School',
        'hyakkiyako' => 'Hyakkiyako Alliance Academy',
        'shanhaijing' => 'Shanhaijing Senior Secondary School',
        'red' => 'Red Winter Federal Academy',
        'valkyrie' => 'Valkyrie Police School',
        'srt' => 'SRT Special Academy',
        'sister' => 'Trinity General School',
        'hina' => 'Gehenna Academy',
        'wakamo' => 'Hyakkiyako Alliance Academy',
        'ninja' => 'Hyakkiyako Alliance Academy',
        'opera' => 'Gehenna Academy',
        'bunny' => 'Millennium Science School',
        'game' => 'Millennium Science School',
        'cafe' => 'Millennium Science School',
        'mille' => 'Millennium Science School',
        'halo' => 'Millennium Science School',
        'sweets' => 'Trinity General School',
        'christmas' => 'Trinity General School',
        'steel' => 'Kivotos',
        'miku' => 'Kivotos',
        'schale' => 'Schale Residence',
        'handyman' => 'Gehenna Academy',
        'hot_spring' => 'Gehenna Academy',
        'neverland' => 'Kivotos',
        'cherry' => 'Hyakkiyako Alliance Academy',
        'ivan' => 'Red Winter Federal Academy',
        'summer_sky' => 'Kivotos',
        'default' => 'Kivotos Central District',
    ];

    public function run(): void
    {
        $students = [
            // Trinity General School (14)
            ['name' => 'Kazusa', 'email' => 'kazusa@trinity.edu.ks'],
            ['name' => 'Airi', 'email' => 'airi@trinity.edu.ks'],
            ['name' => 'Natsu', 'email' => 'natsu@trinity.edu.ks'],
            ['name' => 'Yoshimi', 'email' => 'yoshimi@trinity.edu.ks'],
            ['name' => 'Mika', 'email' => 'mika@trinity.edu.ks'],
            ['name' => 'Nagisa', 'email' => 'nagisa@trinity.edu.ks'],
            ['name' => 'Mashiro', 'email' => 'mashiro@trinity.edu.ks'],
            ['name' => 'Hasumi', 'email' => 'hasumi@trinity.edu.ks'],
            ['name' => 'Ui', 'email' => 'ui@trinity.edu.ks'],
            ['name' => 'Koharu', 'email' => 'koharu@trinity.edu.ks'],
            ['name' => 'Azusa', 'email' => 'azusa@trinity.edu.ks'],
            ['name' => 'Saori', 'email' => 'saori@trinity.edu.ks'],
            ['name' => 'Hifumi', 'email' => 'hifumi@trinity.edu.ks'],
            ['name' => 'Tsurugi', 'email' => 'tsurugi@trinity.edu.ks'],
            // Millennium Science School (12)
            ['name' => 'Yuuka', 'email' => 'yuuka@millennium.edu.ks'],
            ['name' => 'Noa', 'email' => 'noa@millennium.edu.ks'],
            ['name' => 'Aris', 'email' => 'aris@millennium.edu.ks'],
            ['name' => 'Midori', 'email' => 'midori@millennium.edu.ks'],
            ['name' => 'Momoi', 'email' => 'momoi@millennium.edu.ks'],
            ['name' => 'Hibiki', 'email' => 'hibiki@millennium.edu.ks'],
            ['name' => 'Kotama', 'email' => 'kotama@millennium.edu.ks'],
            ['name' => 'Eimi', 'email' => 'eimi@millennium.edu.ks'],
            ['name' => 'Akane', 'email' => 'akane@millennium.edu.ks'],
            ['name' => 'Karin', 'email' => 'karin@millennium.edu.ks'],
            ['name' => 'Asuna', 'email' => 'asuna@millennium.edu.ks'],
            ['name' => 'Neru', 'email' => 'neru@millennium.edu.ks'],
            // Gehenna Academy (7)
            ['name' => 'Hina', 'email' => 'hina@gehenna.edu.ks'],
            ['name' => 'Ako', 'email' => 'ako@gehenna.edu.ks'],
            ['name' => 'Iori', 'email' => 'iori@gehenna.edu.ks'],
            ['name' => 'Aru', 'email' => 'aru@gehenna.edu.ks'],
            ['name' => 'Mutsuki', 'email' => 'mutsuki@gehenna.edu.ks'],
            ['name' => 'Kayoko', 'email' => 'kayoko@gehenna.edu.ks'],
            ['name' => 'Haruka', 'email' => 'haruka@gehenna.edu.ks'],
            // Abydos High School (5)
            ['name' => 'Shiroko', 'email' => 'shiroko@abydos.edu.ks'],
            ['name' => 'Hoshino', 'email' => 'hoshino@abydos.edu.ks'],
            ['name' => 'Serika', 'email' => 'serika@abydos.edu.ks'],
            ['name' => 'Nonomi', 'email' => 'nonomi@abydos.edu.ks'],
            ['name' => 'Ayane', 'email' => 'ayane@abydos.edu.ks'],
            // Hyakkiyako (3)
            ['name' => 'Wakamo', 'email' => 'wakamo@hyakkiyako.edu.ks'],
            ['name' => 'Shizuko', 'email' => 'shizuko@hyakkiyako.edu.ks'],
            ['name' => 'Izuna', 'email' => 'izuna@hyakkiyako.edu.ks'],
            // Shanhaijing (3)
            ['name' => 'Shun', 'email' => 'shun@shanhaijing.edu.ks'],
            ['name' => 'Saya', 'email' => 'saya@shanhaijing.edu.ks'],
            ['name' => 'Kisaki', 'email' => 'kisaki@shanhaijing.edu.ks'],
            // Red Winter (2)
            ['name' => 'Cherino', 'email' => 'cherino@redwinter.edu.ks'],
            ['name' => 'Minori', 'email' => 'minori@redwinter.edu.ks'],
            // Valkyrie (2)
            ['name' => 'Kanna', 'email' => 'kanna@valkyrie.edu.ks'],
            ['name' => 'Kirino', 'email' => 'kirino@valkyrie.edu.ks'],
            // SRT (3)
            ['name' => 'Miyu', 'email' => 'miyu@srt.edu.ks'],
            ['name' => 'Saki', 'email' => 'saki@srt.edu.ks'],
            ['name' => 'Mari', 'email' => 'mari@srt.edu.ks'],
        ];

        $userIds = [];
        foreach ($students as $student) {
            $user = User::updateOrCreate(
                ['email' => $student['email']],
                [
                    'name' => $student['name'],
                    'password' => Hash::make('password'),
                ]
            );
            $userIds[] = $user->id;
        }

        $eventsJson = json_decode(
            file_get_contents(database_path('seeders/data/ba_events.json')),
            true,
            flags: JSON_THROW_ON_ERROR
        );

        $dateCursor = now()->addDay();
        foreach ($eventsJson as $eventData) {
            $title = trim(explode("\n", $eventData['title'])[0]);

            $location = $this->resolveLocation($title);

            $event = Event::create([
                'title' => $title,
                'description' => "Blue Archive event: {$title}",
                'location' => $location,
                'image_url' => $eventData['banner_url'],
                'wiki_url' => $eventData['wiki_url'],
                'starts_at' => $dateCursor,
                'capacity' => rand(30, 300),
            ]);

            $attendeeCount = min(
                rand(5, min($event->capacity, count($userIds))),
                $event->capacity
            );

            $attendees = array_rand(array_flip($userIds), $attendeeCount);

            if (! is_array($attendees)) {
                $attendees = [$attendees];
            }

            foreach ($attendees as $userId) {
                Rsvp::create([
                    'user_id' => $userId,
                    'event_id' => $event->id,
                    'status' => 'attending',
                ]);
            }

            $dateCursor = $dateCursor->addDays(rand(3, 7));
        }
    }

    private function resolveLocation(string $title): string
    {
        $lower = mb_strtolower($title);

        $patterns = [
            '/trinity/i' => 'trinity',
            '/gehenna/i' => 'gehenna',
            '/millennium/i' => 'millennium',
            '/mille/i' => 'mille',
            '/abydos/i' => 'abydos',
            '/hyakkiyako|wakamo|ninja|shinobu|cherry\s.*blossom|neverland/i' => 'hyakkiyako',
            '/shanhaijing|ryubu|doushu/i' => 'shanhaijing',
            '/red\s?winter|ivan/i' => 'red',
            '/valkyrie|kanna/i' => 'valkyrie',
            '/srt|rabbit/i' => 'srt',
            '/sister|christmas|cathedral|sweets/i' => 'trinity',
            '/hina|prefect|opera|handyman|hot.?spring|food|winter.?sky/i' => 'gehenna',
            '/bunny|game|cafe|halo|box/i' => 'millennium',
            '/summer_?sky|summer.?sky/i' => 'summer_sky',
            '/schale/i' => 'schale',
            '/steel/i' => 'steel',
            '/miku/i' => 'miku',
        ];

        foreach ($patterns as $regex => $key) {
            if (preg_match($regex, $lower)) {
                return self::LOCATIONS[$key];
            }
        }

        return self::LOCATIONS['default'];
    }
}
