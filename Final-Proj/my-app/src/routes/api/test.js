export async function get() {
    return {
      status: 200,
      body: { message: 'Test route works!' },
    };
  }