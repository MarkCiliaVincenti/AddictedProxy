﻿using System.IO.Compression;
using AddictedProxy.Storage.Extensions;

namespace AddictedProxy.Storage.Compressor;

public class BrotliCompressor : ICompressor
{
    public BrotliCompressor()
    {
    }

    /// <summary>
    /// Extension related to the compressor
    /// </summary>
    public string Extension => ".brotli";


    /// <summary>
    /// Compress bytes
    /// </summary>
    /// <param name="bytes">Bytes</param>
    /// <returns>Return compressed bytes</returns>
    public byte[] Compress(byte[] bytes)
    {
        using var inputStream = new MemoryStream(bytes);
        using var result = new MemoryStream();
        using var brotliStream = new BrotliStream(result, CompressionLevel.Optimal);

        inputStream.CopyTo(brotliStream);
        inputStream.Flush();
        return result.ToArray();
    }

    /// <summary>
    /// Decompress bytes
    /// </summary>
    /// <param name="compressedBytes">Compressed bytes</param>
    /// <returns>Return uncompressed bytes</returns>
    public byte[] Decompress(byte[] compressedBytes)
    {
        using var compressedStream = new MemoryStream(compressedBytes);
        using var result = new MemoryStream();
        using var brotliStream = new BrotliStream(compressedStream, CompressionMode.Decompress);

        brotliStream.CopyTo(result);
        return result.ToArray();
    }

    /// <summary>
    /// Compress input stream to output stream
    /// </summary>
    /// <param name="inputStream">Input stream</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>Task</returns>
    public async Task<Stream> CompressAsync(Stream inputStream, CancellationToken cancellationToken)
    {
        var outputStream = new MemoryStream();
        await using var brotliStream = new BrotliStream(outputStream, CompressionLevel.Optimal);
        await inputStream.CopyToAsync(brotliStream, cancellationToken);
        await brotliStream.FlushAsync(cancellationToken);
        outputStream.ResetPosition();
        return outputStream;
    }

    /// <summary>
    /// Decompress input stream to output stream
    /// </summary>
    /// <param name="inputStream">Input stream</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>Task</returns>
    public async Task<Stream> DecompressAsync(Stream inputStream, CancellationToken cancellationToken = default)
    {
        var outputStream = new MemoryStream();
        await using var brotliStream = new BrotliStream(inputStream, CompressionMode.Decompress);
        await brotliStream.CopyToAsync(outputStream, cancellationToken);
        outputStream.ResetPosition();
        return outputStream;
    }
}