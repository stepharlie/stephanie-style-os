import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import type {
  ColorFamily,
  PatternType,
  StyleVibe,
  WardrobeCategory,
} from "@/types/wardrobe";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(request: Request, context: RouteContext) {
  const { id } = await context.params;
  const supabase = getSupabaseServerClient();

  if (!supabase) {
    return NextResponse.json(
      { ok: false, error: "Supabase is not configured." },
      { status: 500 },
    );
  }

  let body: {
    name?: string;
    category?: WardrobeCategory;
    subcategory?: string;
    colorFamily?: ColorFamily;
    colorName?: string;
    patternType?: PatternType;
    patternSubtype?: string;
    size?: string;
    brand?: string;
  productUrl?: string;
    notes?: string;
    stylingNotes?: string;
    vibes?: StyleVibe[];
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 },
    );
  }

  const name = body.name?.trim();
  const category = body.category;
  const colorFamily = body.colorFamily;
  const colorName = body.colorName?.trim();

  if (!id || !name || !category || !colorFamily || !colorName) {
    return NextResponse.json(
      { ok: false, error: "Missing required closet item fields." },
      { status: 400 },
    );
  }

  const { data, error } = await supabase
    .from("wardrobe_items")
    .update({
      name,
      category,
      subcategory: body.subcategory?.trim() || null,
      color_family: colorFamily,
      color_name: colorName,
      pattern_type: body.patternType || null,
      pattern_subtype: body.patternSubtype?.trim() || null,
      size: body.size?.trim() || null,
      brand: body.brand?.trim() || null,
      product_url: body.productUrl?.trim() || null,
      notes: body.notes?.trim() || null,
      styling_notes: body.stylingNotes?.trim() || null,
      vibes: Array.isArray(body.vibes) ? body.vibes : [],
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select("id")
    .single();

  if (error) {
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 500 },
    );
  }

  if (!data?.id) {
    return NextResponse.json(
      { ok: false, error: "Closet item was not updated." },
      { status: 404 },
    );
  }

  return NextResponse.json({ ok: true, id: data.id });
}
