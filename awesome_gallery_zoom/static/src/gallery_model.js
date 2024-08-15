import { GalleryModel } from "@awesome_gallery/gallery_model";
import { patch } from "@web/core/utils/patch";


patch(GalleryModel.prototype, {
    setup(orm, resModel, fields, archInfo) {
        const { previewImage } = archInfo;
        this.previewImage = previewImage;
    }
});
