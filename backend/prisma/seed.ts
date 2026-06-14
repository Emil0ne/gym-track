import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const exercises = [
  // === CHEST ===
  { nameEn: 'Barbell Bench Press', namePl: 'Wyciskanie sztangi na ławce poziomej', targetMuscle: 'Chest', equipment: 'Barbell' },
  { nameEn: 'Incline Dumbbell Bench Press', namePl: 'Wyciskanie hantli na skośnej dodatniej', targetMuscle: 'Chest', equipment: 'Dumbbells' },
  { nameEn: 'Flat Dumbbell Bench Press', namePl: 'Wyciskanie hantli na ławce poziomej', targetMuscle: 'Chest', equipment: 'Dumbbells' },
  { nameEn: 'Chest Press Machine', namePl: 'Wyciskanie na maszynie siedząc', targetMuscle: 'Chest', equipment: 'Machine' },
  { nameEn: 'Incline Cable Fly', namePl: 'Rozpiętki na bramie skośnie', targetMuscle: 'Chest', equipment: 'Cables' },
  { nameEn: 'Dips (Chest Focused)', namePl: 'Pompki na poręczach (akcent klatka)', targetMuscle: 'Chest', equipment: 'Bodyweight' },

  // === BACK ===
  { nameEn: 'Pull-ups', namePl: 'Podciąganie na drążku', targetMuscle: 'Back', equipment: 'Bodyweight' },
  { nameEn: 'Lat Pulldown', namePl: 'Ściąganie drążka wyciągu górnego', targetMuscle: 'Back', equipment: 'Machine' },
  { nameEn: 'Barbell Row', namePl: 'Wiosłowanie sztangą w opadzie', targetMuscle: 'Back', equipment: 'Barbell' },
  { nameEn: 'Seated Cable Row', namePl: 'Wiosłowanie na wyciągu poziomym', targetMuscle: 'Back', equipment: 'Cables' },
  { nameEn: 'One-Arm Dumbbell Row', namePl: 'Wiosłowanie hantlem jednorącz', targetMuscle: 'Back', equipment: 'Dumbbells' },
  { nameEn: 'Chest-Supported T-Bar Row', namePl: 'Wiosłowanie w opadzie z oparciem', targetMuscle: 'Back', equipment: 'Machine' },

  // === SHOULDERS ===
  { nameEn: 'Overhead Barbell Press', namePl: 'Wyciskanie żołnierskie', targetMuscle: 'Shoulders', equipment: 'Barbell' },
  { nameEn: 'Seated Dumbbell Shoulder Press', namePl: 'Wyciskanie hantli nad głowę siedząc', targetMuscle: 'Shoulders', equipment: 'Dumbbells' },
  { nameEn: 'Dumbbell Lateral Raise', namePl: 'Wznosy hantli bokiem', targetMuscle: 'Shoulders', equipment: 'Dumbbells' },
  { nameEn: 'Cable Lateral Raise', namePl: 'Wznosy bokiem na wyciągu', targetMuscle: 'Shoulders', equipment: 'Cables' },
  { nameEn: 'Reverse Dumbbell Fly', namePl: 'Odwodzenie ramion w opadzie', targetMuscle: 'Shoulders', equipment: 'Dumbbells' },
  { nameEn: 'Face Pulls', namePl: 'Przyciąganie linki wyciągu do twarzy', targetMuscle: 'Shoulders', equipment: 'Cables' },

  // === BICEPS ===
  { nameEn: 'Barbell Curl', namePl: 'Uginanie ramion ze sztangą', targetMuscle: 'Biceps', equipment: 'Barbell' },
  { nameEn: 'Incline Dumbbell Curl', namePl: 'Uginanie z hantlami na ławce skośnej', targetMuscle: 'Biceps', equipment: 'Dumbbells' },
  { nameEn: 'Hammer Curl', namePl: 'Uginanie ramion chwytem młotkowym', targetMuscle: 'Biceps', equipment: 'Dumbbells' },
  { nameEn: 'Preacher Curl', namePl: 'Uginanie ramion na modlitewniku', targetMuscle: 'Biceps', equipment: 'Machine' },

  // === TRICEPS ===
  { nameEn: 'Close-Grip Barbell Bench Press', namePl: 'Wyciskanie sztangi w wąskim chwycie', targetMuscle: 'Triceps', equipment: 'Barbell' },
  { nameEn: 'Dips (Triceps Focused)', namePl: 'Pompki na poręczach (akcent triceps)', targetMuscle: 'Triceps', equipment: 'Bodyweight' },

  // === QUADS ===
  { nameEn: 'Barbell Back Squat', namePl: 'Przysiad ze sztangą na karku', targetMuscle: 'Quads', equipment: 'Barbell' },
  { nameEn: 'Hack Squat', namePl: 'Przysiad na maszynie Hack', targetMuscle: 'Quads', equipment: 'Machine' },
  { nameEn: 'Leg Press', namePl: 'Wypychanie nóg na suwnicy', targetMuscle: 'Quads', equipment: 'Machine' },
  { nameEn: 'Bulgarian Split Squat', namePl: 'Przysiad bułgarski', targetMuscle: 'Quads', equipment: 'Dumbbells' },
  { nameEn: 'Leg Extension', namePl: 'Prostowanie nóg na maszynie siedząc', targetMuscle: 'Quads', equipment: 'Machine' },

  // === HAMSTRINGS & GLUTES ===
  { nameEn: 'Romanian Deadlift', namePl: 'Martwy ciąg na prostych nogach (RDL)', targetMuscle: 'Hamstrings', equipment: 'Barbell' },
  { nameEn: 'Dumbbell Romanian Deadlift', namePl: 'RDL z hantlami', targetMuscle: 'Hamstrings', equipment: 'Dumbbells' },
  { nameEn: 'Seated Leg Curl', namePl: 'Uginanie nóg na maszynie siedząc', targetMuscle: 'Hamstrings', equipment: 'Machine' },
  { nameEn: 'Lying Leg Curl', namePl: 'Uginanie nóg na maszynie leżąc', targetMuscle: 'Hamstrings', equipment: 'Machine' },
  { nameEn: 'Barbell Hip Thrust', namePl: 'Wznosy bioder ze sztangą', targetMuscle: 'Glutes', equipment: 'Barbell' },

  // === ABS ===
  { nameEn: 'Hanging Leg Raise', namePl: 'Unoszenie nóg w zwisie na drążku', targetMuscle: 'Abs', equipment: 'Bodyweight' },
  { nameEn: 'Cable Crunch', namePl: 'Skłony tułowia z linką wyciągu (Allahy)', targetMuscle: 'Abs', equipment: 'Cables' },
  { nameEn: 'Ab Wheel Rollout', namePl: 'Kółko do ćwiczeń mięśni brzucha', targetMuscle: 'Abs', equipment: 'Bodyweight' }
];

async function main() {
  console.log('Start seeding an expanded, bilingual list of exercises...');
  
  for (const ex of exercises) {
    await prisma.exercise.upsert({
      where: { nameEn: ex.nameEn },
      update: {
        namePl: ex.namePl,
        targetMuscle: ex.targetMuscle,
        equipment: ex.equipment
      },
      create: ex,
    });
  }
  
  console.log(`Successfully seeded ${exercises.length} bilingual exercises.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });