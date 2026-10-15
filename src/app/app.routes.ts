import { Routes } from '@angular/router';
import { Page } from './pages/page/page';
import { About } from './pages/about/about';
import { Video } from './pages/video/video';

export const routes: Routes = [
    {   path: '',
        component: Page
    },
    {   path: 'pages/about',
        component: About
    },
    {   path: 'pages/video',
        component: Video
    },
];
