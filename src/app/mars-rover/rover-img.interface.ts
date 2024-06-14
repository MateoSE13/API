// Properties to consider:
// - id
// - sol
// - camera.id
// - camera.name
// - camera.rover_id
// - camera.full_name
// - img_src
// - earth_date
// - rover.id
// - rover.name
// - rover.landing_date
// - rover.launch_date
// - rover.status

export interface roverImg {
  id: number;
  sol: number;
  camera: {
    id: number;
    name: string;
    rover_id: number;
    full_name: string
  };
  img_src: string;
  earth_date: string;
  rover: {
    id: number;
    name: string;
    landing_date: string;
    launch_date: string;
    status: string;
  }
}