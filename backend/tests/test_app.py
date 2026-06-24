from store.models import Category


def test_category_fields():
    category = Category(
        name="Electronics",
        slug="electronics"
    )

    assert category.name == "Electronics"
    assert category.slug == "electronics"