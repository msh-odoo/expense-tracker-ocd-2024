import { GalleryArchParser } from "@awesome_gallery/gallery_arch_parser";
import { patch } from "@web/core/utils/patch";


patch(GalleryArchParser.prototype, {
    parse(xmlDoc) {
        const result = super.parse(xmlDoc);
        const previewImage = xmlDoc.getAttribute("preview_image");
        return {
            ...result,
            previewImage,
        }
    }
});
