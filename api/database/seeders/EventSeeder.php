<?php

namespace Database\Seeders;

use App\Models\Event;
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
            ['name' => 'Kazusa', 'email' => 'kazusa@trinity.edu.ks'],
            ['name' => 'Airi', 'email' => 'airi@trinity.edu.ks'],
            ['name' => 'Natsu', 'email' => 'natsu@trinity.edu.ks'],
            ['name' => 'Yoshimi', 'email' => 'yoshimi@trinity.edu.ks'],
            ['name' => 'Shiroko', 'email' => 'shiroko@abydos.edu.ks'],
            ['name' => 'Hoshino', 'email' => 'hoshino@abydos.edu.ks'],
            ['name' => 'Yuuka', 'email' => 'yuuka@millennium.edu.ks'],
            ['name' => 'Noa', 'email' => 'noa@millennium.edu.ks'],
            ['name' => 'Hina', 'email' => 'hina@gehenna.edu.ks'],
            ['name' => 'Ako', 'email' => 'ako@gehenna.edu.ks'],
            ['name' => 'Aris', 'email' => 'aris@millennium.edu.ks'],
            ['name' => 'Mika', 'email' => 'mika@trinity.edu.ks'],
        ];

        foreach ($students as $student) {
            User::updateOrCreate(
                ['email' => $student['email']],
                [
                    'name' => $student['name'],
                    'password' => Hash::make('password'),
                ]
            );
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
                'title' => 'Shale Schale Training Session',
                'description' => 'Standard combat training for students from all schools. Supervised by Sensei.',
                'location' => 'Schale Residence - Combat Simulation Room',
                'starts_at' => now()->addDays(4)->setTime(10, 0),
                'capacity' => 25,
            ],
        ];

        foreach ($events as $event) {
            Event::create($event);
        }
    }
}
