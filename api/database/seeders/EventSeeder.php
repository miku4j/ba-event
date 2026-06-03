<?php

namespace Database\Seeders;

use App\Models\Event;
use App\Models\Rsvp;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class EventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
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

        $events = [
            [
                'title' => 'After-School Sweets Club Live - Re:Aho',
                'description' => 'A special live performance by the After-School Sweets Club! Come and enjoy our new songs and delicious sweets.',
                'location' => 'Trinity General School - Auditorium',
                'starts_at' => now()->addDays(7)->setTime(18, 0),
                'capacity' => 50,
            ],
            [
                'title' => 'Abydos Desert Cleanup Drive',
                'description' => 'Join the Foreclosure Task Force in preserving the beauty of Abydos. Please bring your own gear.',
                'location' => 'Abydos District - Sector 04',
                'starts_at' => now()->addDays(2)->setTime(9, 0),
                'capacity' => 20,
            ],
            [
                'title' => 'Millennium Science School Game Jam',
                'description' => '48 hours of non-stop game development. Hosted by the Game Development Department.',
                'location' => 'Millennium Science School - Engineering Club Lab',
                'starts_at' => now()->addDays(14)->setTime(10, 0),
                'capacity' => 100,
            ],
            [
                'title' => 'Gehenna Gourmet Research Society Tour',
                'description' => 'A culinary journey through Kivotos. Warning: May involve explosions.',
                'location' => 'Kivotos Central District - Restaurant Alley',
                'starts_at' => now()->addDays(5)->setTime(12, 0),
                'capacity' => 15,
            ],
            [
                'title' => 'Prefect Team Discipline Workshop',
                'description' => 'Learn about school regulations and maintenance of order with Head Prefect Hina.',
                'location' => 'Gehenna Academy - Main Hall',
                'starts_at' => now()->addDays(3)->setTime(15, 0),
                'capacity' => 40,
            ],
            [
                'title' => 'Seminar Budgeting Seminar',
                'description' => 'Yuuka explains the importance of financial discipline and receipt management.',
                'location' => 'Millennium Science School - Seminar Room 101',
                'starts_at' => now()->addDays(1)->setTime(14, 0),
                'capacity' => 30,
            ],
            [
                'title' => 'Veritas Hacking Convention',
                'description' => 'Technical talks and CTF challenges. No unauthorized access allowed.',
                'location' => 'Millennium Science School - IT Building',
                'starts_at' => now()->addDays(10)->setTime(20, 0),
                'capacity' => 60,
            ],
            [
                'title' => 'C&C Maid Training Program',
                'description' => 'Service with a smile... and tactical precision. Cleaning and combat training.',
                'location' => 'Millennium Science School - Secret HQ',
                'starts_at' => now()->addDays(8)->setTime(13, 0),
                'capacity' => 10,
            ],
            [
                'title' => 'Sisterhood Charity Tea Party',
                'description' => 'A calm afternoon with tea and prayers. Proceeds go to Trinity local orphanage.',
                'location' => 'Trinity General School - Cathedral Garden',
                'starts_at' => now()->addDays(6)->setTime(16, 0),
                'capacity' => 80,
            ],
            [
                'title' => 'Red Winter Labor Festival',
                'description' => 'Celebrate the glorious labor! Free pudding for every participant (while stocks last).',
                'location' => 'Red Winter Federal Academy - Red Square',
                'starts_at' => now()->addDays(12)->setTime(8, 0),
                'capacity' => 200,
            ],
            [
                'title' => 'Hyakkiyako Summer Festival',
                'description' => 'Fireworks, traditional snacks, and street performances.',
                'location' => 'Hyakkiyako Academy - Traditional Street',
                'starts_at' => now()->addDays(20)->setTime(19, 0),
                'capacity' => 150,
            ],
            [
                'title' => 'Schale Training Session',
                'description' => 'Standard combat training for students from all schools. Supervised by Sensei.',
                'location' => 'Schale Residence - Combat Simulation Room',
                'starts_at' => now()->addDays(4)->setTime(10, 0),
                'capacity' => 25,
            ],
        ];

        foreach ($events as $eventData) {
            $event = Event::create($eventData);

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
        }
    }
}
