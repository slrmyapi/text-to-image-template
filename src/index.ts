export default {
  async fetch(request, env) {
    const searchParams = new URLSearchParams(request.url);
    const prompt = searchParams.get("prompt");
    if (!prompt) return Response.json({
      message: "Missing param (prompt)",
    })
    const inputs = {
      prompt,
    };

    const response = await env.AI.run(
      "@cf/stabilityai/stable-diffusion-xl-base-1.0",
      inputs,
    );

    return new Response(response, {
      headers: {
        "content-type": "image/png",
      },
    });
  },
} satisfies ExportedHandler<Env>;
