import CMS from 'netlify-cms-app';
import IndexPagePreview from './preview-templates/IndexPagePreview';
import InformationPagePreview from './preview-templates/InformationPagePreview';

CMS.registerPreviewTemplate('index', IndexPagePreview);
CMS.registerPreviewTemplate('information', InformationPagePreview);
