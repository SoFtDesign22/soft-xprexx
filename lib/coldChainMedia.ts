/**
 * Temporary editorial photography for Cold Chain.
 * Replace the truck src with the user's approved Soft Xprexx truck photograph
 * when the final truck design is supplied. Keep the original image's geometry.
 *
 * Source credits:
 * https://www.pexels.com/photo/a-worker-in-a-storage-room-5953713/
 * https://www.pexels.com/photo/white-delivery-truck-on-urban-road-in-daylight-31049388/
 * Pexels license permits website and commercial use.
 */
export const coldChainMedia = {
  coldRoom: {
    src: "https://images.pexels.com/photos/5953713/pexels-photo-5953713.jpeg?auto=compress&cs=tinysrgb&w=1600",
    alt: "Worker in a cold storage facility with shelves of temperature-sensitive goods",
  },
  truck: {
    src: "https://images.pexels.com/photos/31049388/pexels-photo-31049388.jpeg?auto=compress&cs=tinysrgb&w=1400",
    alt: "White delivery truck, an illustrative placeholder for a future Soft Xprexx refrigerated truck design",
    isPlaceholder: true,
  },
} as const;
