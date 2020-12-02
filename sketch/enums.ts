export type AvailableScenes = 'intro' | 'main_title' | 'credits' | 'stage1' | 'stage2' | 'boss' | 'game_over';

export enum SceneState {
    intro,
    playing,
    ending
}