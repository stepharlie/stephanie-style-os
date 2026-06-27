import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";

type SaveOutfitBody = {
  title?: string;
  status?: string;
  source?: string;
  sourceOutfitId?: string;
  occasion?: string;
  formula?: string;
  decision?: string;
  generatedPieceIds?: string[];
  editedPieceIds?: string[];
  selectedPieces?: unknown[];
  scores?: Record<string, unknown>;
  stylingInstruction?: string;
  whyItWorks?: string[];
  notes?: string;
};

function normalizeText(value?: string | null) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

function normalizeArray(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string" && item.trim().length > 0);
}

export async function POST(request: Request) {
  const supabase = getSupabaseServerClient();

  if (!supabase) {
    return NextResponse.json(
      { ok: false, error: "Supabase is not configured." },
      { status: 500 },
    );
  }

  let body: SaveOutfitBody;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 },
    );
  }

  const title = normalizeText(body.title) ?? "Saved outfit";
  const editedPieceIds = normalizeArray(body.editedPieceIds);
  const generatedPieceIds = normalizeArray(body.generatedPieceIds);

  if (editedPieceIds.length === 0) {
    return NextResponse.json(
      { ok: false, error: "Saved outfit needs at least one piece." },
      { status: 400 },
    );
  }

  const { data, error } = await supabase
    .from("saved_outfits")
    .insert({
      title,
      status: normalizeText(body.status) ?? "saved",
      source: normalizeText(body.source) ?? "generated",
      source_outfit_id: normalizeText(body.sourceOutfitId),
      occasion: normalizeText(body.occasion),
      formula: normalizeText(body.formula),
      decision: normalizeText(body.decision),
      generated_piece_ids: generatedPieceIds,
      edited_piece_ids: editedPieceIds,
      selected_pieces: Array.isArray(body.selectedPieces) ? body.selectedPieces : [],
      scores: body.scores ?? {},
      styling_instruction: normalizeText(body.stylingInstruction),
      why_it_works: normalizeArray(body.whyItWorks),
      notes: normalizeText(body.notes),
    })
    .select("id")
    .single();

  if (error) {
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true, id: data.id });
}

export async function GET() {
  const supabase = getSupabaseServerClient();

  if (!supabase) {
    return NextResponse.json(
      { ok: false, error: "Supabase is not configured." },
      { status: 500 },
    );
  }

  const { data, error } = await supabase
    .from("saved_outfits")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) {
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true, outfits: data });
}
