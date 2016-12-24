import del from 'del';

export default async () => {
  await del(['build/*'], { dot: true });
};
