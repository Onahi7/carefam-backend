import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { AuthService } from '../auth/auth.service';
import { UsersService } from '../users/users.service';
import { UserRole } from '../common/schemas/user.schema';
import * as bcrypt from 'bcryptjs';

async function seedUsers() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const authService = app.get(AuthService);
  const usersService = app.get(UsersService);

  // Common password for all users: admin@2025
  const password = 'admin@2025';
  const hashedPassword = await bcrypt.hash(password, 12);

  const users = [
    {
      firstName: 'John',
      lastName: 'Admin',
      email: 'admin@pharmacy.sl',
      password: hashedPassword,
      role: UserRole.ADMIN,
      assignedOutlets: [],
    },
    {
      firstName: 'Sarah',
      lastName: 'Manager',
      email: 'manager@pharmacy.sl',
      password: hashedPassword,
      role: UserRole.MANAGER,
      assignedOutlets: [],
    },
    {
      firstName: 'Mike',
      lastName: 'Staff',
      email: 'staff@pharmacy.sl',
      password: hashedPassword,
      role: UserRole.CASHIER,
      assignedOutlets: [],
    },
  ];

  try {
    for (const userData of users) {
      // Check if user already exists
      const existingUser = await usersService.findByEmail(userData.email);
      if (existingUser) {
        console.log(`User ${userData.email} already exists, skipping...`);
        continue;
      }

      // Create user using the register method
      const registerDto = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        username: `${userData.firstName.toLowerCase()}.${userData.lastName.toLowerCase()}`,
        email: userData.email,
        password: 'admin@2025', // Use plain password, AuthService will hash it
        role: userData.role,
        assignedOutlets: userData.assignedOutlets,
      };

      const user = await authService.register(registerDto);
      console.log(`✅ Created ${userData.role} user: ${userData.email}`);
      console.log(`   Name: ${userData.firstName} ${userData.lastName}`);
      console.log(`   Password: admin@2025`);
      console.log(`   Role: ${userData.role}`);
      console.log('');
    }

    console.log('🎉 User seeding completed successfully!');
    console.log('\n📋 Login Credentials:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('👑 ADMIN:   admin@pharmacy.sl    | admin@2025');
    console.log('👨‍💼 MANAGER: manager@pharmacy.sl  | admin@2025');
    console.log('👤 STAFF:   staff@pharmacy.sl    | admin@2025');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  } catch (error) {
    console.error('❌ Error seeding users:', error);
  } finally {
    await app.close();
  }
}

// Run the seeding function
seedUsers().catch(console.error);