import CMS from 'netlify-cms-app';
import IndexPagePreview from './preview-templates/IndexPagePreview';
import InformationPagePreview from './preview-templates/InformationPagePreview';
import ProjectPagePreview from './preview-templates/ProjectPagePreview';
import cloudinary from 'netlify-cms-media-library-cloudinary';

CMS.registerMediaLibrary(cloudinary);
CMS.registerPreviewTemplate('index', IndexPagePreview);
CMS.registerPreviewTemplate('information', InformationPagePreview);
CMS.registerPreviewTemplate('projects', ProjectPagePreview);
