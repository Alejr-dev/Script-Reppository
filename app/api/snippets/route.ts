import connect from "@/app/lib/connect";
import SnippetM from "@/app/Models/SnippetSchema";
import { NextResponse, NextRequest } from "next/server"; // Importa NextRequest

export async function POST(req: NextRequest) { // Cambia a NextRequest
  try {
    const {
      title,
      isFavorite,
      clerkUserId,
      tags,
      description,
      code,
      language,
      creationDate,
      isTrash,
    } = await req.json();

    await connect();

    const note = new SnippetM({
      title,
      isFavorite,
      clerkUserId,
      tags,
      description,
      code,
      language,
      creationDate,
      isTrash,
    });

    const savedNote = await note.save();
    return NextResponse.json({ notes: savedNote });
  } catch (error) {
    console.error("Error creating snippet:", error);
    return NextResponse.json({ error: "An error occurred while creating the snippet." }, { status: 400 });
  }
}

export async function GET(req: NextRequest) { // Cambia a NextRequest
  try {
    const clerkId = req.nextUrl.searchParams.get("clerkId");
    await connect();
    const notes = await SnippetM.find({ clerkUserId: clerkId });
    return NextResponse.json({ notes });
  } catch (error) {
    console.error("Error fetching snippets:", error);
    return NextResponse.json({ error: "An error occurred while fetching snippets." }, { status: 400 });
  }
}

export async function PUT(req: NextRequest) { // Cambia a NextRequest
  try {
    const snippetId = req.nextUrl.searchParams.get("snippetId");
    const {
      title,
      isFavorite,
      clerkUserId,
      tags,
      description,
      code,
      language,
      creationDate,
      isTrash,
    } = await req.json();

    if (!snippetId) {
      return NextResponse.json({ message: "Snippet ID is required" }, { status: 400 });
    }

    await connect();

    const updatedSnippet = await SnippetM.findOneAndUpdate(
      { _id: snippetId },
      { $set: { title, isFavorite, clerkUserId, tags, description, code, language, creationDate, isTrash } },
      { new: true }
    );

    if (!updatedSnippet) {
      return NextResponse.json({ message: "Snippet not found" }, { status: 404 });
    }

    return NextResponse.json({ note: updatedSnippet });
  } catch (error) {
    console.error("Error updating snippet:", error);
    return NextResponse.json({ error: "An error occurred while updating the snippet." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) { // Cambia a NextRequest
  try {
    const url = new URL(req.url);
    const snippetId = url.searchParams.get("snippetId");

    if (!snippetId) {
      return NextResponse.json({ message: "snippetId is required" }, { status: 400 });
    }

    const snippetToDelete = await SnippetM.findOneAndDelete({ _id: snippetId });

    if (!snippetToDelete) {
      return NextResponse.json({ message: "Snippet not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Snippet deleted successfully" });
  } catch (error) {
    console.error("Error deleting snippet:", error);
    return NextResponse.json({ error: "Failed to delete snippet" }, { status: 500 });
  }
}
