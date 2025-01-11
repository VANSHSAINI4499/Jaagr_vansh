import React, { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Paragraph from "@editorjs/paragraph";
import SimpleImage from "@editorjs/image";
import axios from 'axios';
import { ArrowLeft, Camera } from "lucide-react";

const BlogEditor = () => {
  const editorRef = useRef(null); 
  const [editor, setEditor] = useState(null);
  const [lastSaved, setLastSaved] = useState("2 minutes ago");
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [uploadedImage, setUploadedImage] = useState(null); 
  const [imageUrl, setImageUrl] = useState(null); // State to store the image URL

  useEffect(() => {
    // Initialize Editor.js only once
    if (!editor) {
      const editorInstance = new EditorJS({
        holder: "editorjs", // ID of the container
        tools: {
          header: {
            class: Header,
            config: {
              levels: [1, 2, 3, 4],
              defaultLevel: 1,
            },
          },
          list: {
            class: List,
            inlineToolbar: true,
          },
          paragraph: {
            class: Paragraph,
            inlineToolbar: true,
          },
          Image: {
            class: SimpleImage,
            config: {
              uploader: {
                async uploadByFile(file) {
                  const formData = new FormData();
                  formData.append('file', file);

                  const response = await axios.post(
                    `http://localhost:5173/api/uploadImage/create`,
                    formData, {
                      headers: {
                        "Content-Type": "multipart/form-data",
                      },
                      withCredentials: false,
                    }
                  );

                  if (response.data.success === 1) {
                    const { url } = response.data; // Assuming the response contains an "url" field
                    setImageUrl(url); // Save the image URL
                    return {
                      success: 1,
                      file: {
                        url,
                      },
                    };
                  }
                },
              },
            },
          },
        },
        placeholder: "Start writing your blog post here...",
        onChange: async () => {
          try {
            const content = await editorInstance.save();
            updateWordAndCharCount(content);
          } catch (error) {
            console.error("Error during content save:", error);
          }
        },
      });

      setEditor(editorInstance);
    }

    return () => {
      // Clean up Editor.js instance on unmount
      if (editor && typeof editor.destroy === "function") {
        editor.destroy();
        setEditor(null);
      }
    };
  }, [editor]);

  // Update word and character count
  const updateWordAndCharCount = (content) => {
    let words = 0;
    let chars = 0;

    if (content && Array.isArray(content.blocks)) {
      content.blocks.forEach((block) => {
        if (block.data && typeof block.data.text === "string") {
          words += block.data.text.trim().split(/\s+/).length;
          chars += block.data.text.length;
        }
      });
    }

    setWordCount(words);
    setCharCount(chars);
  };

  // Save blog content
  const handleSave = async () => {
    if (editor) {
      try {
        const content = await editor.save();
        console.log("Saved content:", content);
        setLastSaved("just now");
      } catch (error) {
        console.error("Error saving content:", error);
      }
    }
  };

  // Handle image upload
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await axios.post(
          `http://localhost:5173/api/uploadImage/create`,
          formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.data.success === 1) {
          const { url } = response.data;
          setUploadedImage(URL.createObjectURL(file)); // Local preview
          setImageUrl(url); // Save the uploaded URL
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white px-4 py-2">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <input
              type="text"
              placeholder="Enter blog title..."
              className="border-none text-lg font-medium focus:outline-none"
            />
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-500">Last saved {lastSaved}</span>
            <button
              className="rounded border px-4 py-2 text-sm"
              onClick={handleSave}
            >
              Save Draft
            </button>
            <button className="rounded bg-orange-500 px-4 py-2 text-sm text-white hover:bg-orange-600">
              Publish
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto grid max-w-6xl gap-6 p-6 lg:grid-cols-[1fr,300px]">
        {/* Editor */}
        <div className="space-y-6">
          <div className="rounded-lg border bg-white p-6">
            <div id="editorjs" ref={editorRef} className="min-h-[400px]" />
            <div className="mt-4 text-sm text-gray-500">
              Words: {wordCount} Characters: {charCount}
              <span className="float-right text-green-500">Changes saved</span>
            </div>
          </div>
          {/* Image Preview Section */}
          {uploadedImage && (
            <div className="rounded-lg border bg-white p-4">
              <h3 className="font-medium">Uploaded Image Preview</h3>
              <img
                src={uploadedImage}
                alt="Uploaded Preview"
                className="mt-4 rounded-lg"
              />
              {imageUrl && (
                <p className="mt-2 text-sm text-gray-600">Uploaded URL: <a href={imageUrl} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">{imageUrl}</a></p>
              )}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          <div className="rounded-lg border bg-white p-4">
            <h3 className="mb-3 font-medium">Preview Mode</h3>
            <div className="h-32 rounded-lg border-2 border-dashed border-gray-200 bg-gray-50"></div>
          </div>

          <div className="rounded-lg border bg-white p-4">
            <h3 className="mb-3 font-medium">Categories</h3>
            <select className="w-full rounded-md border p-2">
              <option>AI</option>
              <option>Computer Science</option>
              <option>Agents</option>
              <option>Currency</option>
              <option>Computer</option>
              <option>Pollutin</option>
              <option>Environment</option>
            </select>
          </div>

          <div className="rounded-lg border bg-white p-4">
            <h3 className="mb-3 font-medium">Tags</h3>
            <div className="mb-3 flex flex-wrap gap-2">
              <span className="rounded-full bg-gray-100 px-3 py-1 text-sm">
                Depression
              </span>
            </div>
            <input
              type="text"
              placeholder="Add a tag..."
              className="w-full rounded-md border p-2"
            />
          </div>

          <div className="rounded-lg border bg-white p-4">
            <h3 className="mb-3 font-medium">Featured Image</h3>
            <div className="flex items-center justify-center">
              <label
                htmlFor="imageUpload"
                className="flex cursor-pointer items-center rounded-lg border border-dashed px-4 py-8 text-center"
              >
                <Camera className="mx-auto mb-2 h-6 w-6" />
                <span className="text-sm text-gray-500">
                  Click to upload an image
                </span>
              </label>
              <input
                type="file"
                id="imageUpload"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default BlogEditor;
