import { Request, Response } from "express";
import { Pool } from "mysql2/promise";
import { connect } from "../database";
import { IPost } from "../interfaces/post.interface";

export async function getPosts(req: Request, res:Response): Promise<Response> {
  const conn:Pool = await connect();
  const posts = await conn.query("SELECT * FROM posts;");
  return res.json(posts[0]);
}

export async function createPosts(req: Request, res: Response): Promise<Response> {
  const newPost:IPost = req.body;
  const conn: Pool = await connect();
  await conn.query("INSERT INTO posts SET ?", [newPost]);
  return res.json( {message: 'Post Created'});
};

export async function getPost(req: Request, res: Response): Promise<Response> {
  const { id } = req.params;
  const conn:Pool = await connect();
  const post = await conn.query("SELECT * FROM posts WHERE id = ?", [id]);
  return res.json(post[0]);
}

export async function deletePost(req: Request, res: Response): Promise<Response> {
  const { id } = req.params;
  const conn: Pool = await connect();
  await conn.query("DELETE FROM posts WHERE id = ?", [id]);
  return res.json({message: 'Post delete'});
}

export async function updatePost(req: Request, res: Response): Promise<Response> {
  const { id } = req.params;
  const updatePost: IPost = req.body;
  const conn: Pool = await connect();
  await conn.query("UPDATE posts set ? WHERE id = ?", [updatePost, id]);
  return res.json({message: 'Post update'});
}