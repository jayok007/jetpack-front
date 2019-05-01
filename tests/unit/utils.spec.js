import { encodeImageFile } from '@/utils'

describe('utils', () => {
  it('should convert a file to a base64 string', async () => {
    const base64 = await encodeImageFile(
      new File([''], 'test.png', {
        type: 'image/png'
      })
    )

    expect(base64).toBe('data:image/png;base64,')
  })
})
