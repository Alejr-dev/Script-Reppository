import connect from "@/app/lib/connect";
import Tag from "@/app/Models/TagSchema";
import { NextResponse, NextRequest } from "next/server"; // Importa NextRequest

export async function POST(req: NextRequest) { // Cambia a NextRequest
  try {
    const { name, clerkUserId } = await req.json();

    await connect();

    const tag = new Tag({
      name,
      clerkUserId,
    });

    const savedTag = await tag.save();

    return NextResponse.json({ tags: savedTag });
  } catch (error) {
    console.error("Error creating tag:", error);
    return NextResponse.json({ error: "An error occurred while creating the tag." }, { status: 400 });
  }
}

export async function GET(req: NextRequest) { // Cambia a NextRequest
  try {
    const clerkId = req.nextUrl.searchParams.get("clerkId");
    await connect();
    const tags = await Tag.find({ clerkUserId: clerkId });
    return NextResponse.json({ tags });
  } catch (error) {
    console.error("Error fetching tags:", error);
    return NextResponse.json({ error: "An error occurred while fetching tags." }, { status: 400 });
  }
}

export async function PUT(req: NextRequest) { // Cambia a NextRequest
  try {
    const tagId = req.nextUrl.searchParams.get("tagId");
    const { name, clerkUserId } = await req.json();

    if (!tagId) {
      return NextResponse.json({ message: "Tag ID is required" }, { status: 400 });
    }

    await connect();

    const updatedTag = await Tag.findOneAndUpdate(
      { _id: tagId },
      { $set: { name, clerkUserId } },
      { new: true } // Retorna el documento actualizado
    );

    if (!updatedTag) {
      return NextResponse.json({ message: "Tag not found" }, { status: 404 });
    }

    return NextResponse.json({ tag: updatedTag });
  } catch (error) {
    console.error("Error updating the tag:", error);
    return NextResponse.json({ error: "An error occurred while updating the tag." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) { // Cambia a NextRequest
  try {
    const url = new URL(req.url);
    const tagId = url.searchParams.get("tagId");

    if (!tagId) {
      return NextResponse.json({ message: "tagId is required" }, { status: 400 });
    }

    const tagToDelete = await Tag.findOneAndDelete({ _id: tagId });

    if (!tagToDelete) {
      return NextResponse.json({ message: "Tag not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Tag deleted successfully" });
  } catch (error) {
    console.error("Error deleting tag:", error);
    return NextResponse.json({ error: "Failed to delete tag" }, { status: 500 });
  }
}
