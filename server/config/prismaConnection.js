const prisma = require('../prisma/client');

const prismaConnect = async () => {
  try {
    await prisma.$connect();

    // Bağlantıyı test etmek için basit bir query
    const healthCheck = await prisma.$queryRaw`SELECT NOW() as server_time, version() as postgres_version`;

    console.log('=================================');
    console.log('✅ PRISMA POSTGRESQL CONNECTED');
    console.log('=================================');
    console.log(`🕐 Server Time: ${healthCheck[0].server_time}`);
    console.log(`🔧 PostgreSQL: ${healthCheck[0].postgres_version.split(' ').slice(0, 3).join(' ')}`);
    console.log(`🌐 Connection: ${process.env.DATABASE_URL.split('@')[1]?.split('/')[0] || 'localhost'}`);
    console.log('=================================');

  } catch (err) {
    console.error('❌ PRISMA POSTGRESQL CONNECTION FAILED:');
    console.error('Error Details:', err.message);
    process.exit(1);
  }
};

module.exports = prismaConnect;
